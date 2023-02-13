package com.kaspi.backend.service;

import com.kaspi.backend.dao.FoodImageDao;
import com.kaspi.backend.dao.GasDetailDao;
import com.kaspi.backend.dao.UserGasRecordDao;
import com.kaspi.backend.domain.*;
import com.kaspi.backend.dto.UserEcoRecordResDto;
import com.kaspi.backend.dto.UserGasRecordReqDto;
import com.kaspi.backend.util.exception.SqlNotFoundException;
import com.kaspi.backend.util.response.code.ErrorCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserRecordService {
    private final GasDetailDao gasDetailDao;
    private final HttpSessionService httpSessionService;
    private final UserGasRecordDao userGasRecordDao;

    private final FoodImageDao foodImageDao;


    /**
     *
     * 사용자로 부터 받은 주유금액, 유종과 주유소 정보로 얼마만큼 넣었는지 계산하는 로직
     */
    public Long calTodayUserGasAmount(UserGasRecordReqDto userGasRecordReqDto, GasStation gasStation) {
        Optional<Long> todayGasPrice = gasDetailDao.findTodayGasPrice(gasStation.getStationNo(),
                userGasRecordReqDto.getGasType().name(),
                GasDetail.getNowDateToStr());//오늘 날짜로 계산
        if (todayGasPrice.isEmpty()) {
            log.error("DB에 오늘날짜에 해당되는 주유 가격 정보가 존재하지 않음 가스타입:{}, 주유소PK:{}",userGasRecordReqDto.getGasType().name(),gasStation.getStationNo());
            throw new NoSuchElementException(ErrorCode.SQL_NOT_FOUND.getMessage());
        }
        Long userGasAmount = (long) Math.round(userGasRecordReqDto.getRefuelingPrice() / todayGasPrice.get());
        log.info("사용자가 주유한 가스타입:{}, 주유량:{}",userGasRecordReqDto.getGasType().name(),userGasAmount);
        return userGasAmount;
    }

    public Long calUserSavingAmount(Long userRefuelingPrice, Long userGasAmount, Long nationalAvgOilPrice) {
            return userRefuelingPrice - nationalAvgOilPrice * userGasAmount;
    }


    @Transactional
    public UserGasRecord saveUserGasRecord(UserGasRecordReqDto userGasRecordReqDto, GasStation gasStation, Long userGasAmount, Long usersSavingPrice) {
        User user = httpSessionService.getUserFromSession();
        UserGasRecord userGasRecord = UserGasRecord.builder().userNo(user.getUserNo())
                .gasStationNo(gasStation.getStationNo())
                .chargeDate(new Date())
                .refuelingPrice(userGasRecordReqDto.getRefuelingPrice())
                .recordGasAmount(userGasAmount) //주유소 주유량
                .savingPrice(usersSavingPrice) // 사용자 전국 유가 평균값  가져오기
                .recordGasType(userGasRecordReqDto.getGasType()) // 여기서 변환할때 영어로 에러뜰려나?
                .build();
        log.info("유저 주유기록 저장 유저No:{}",user.getUserNo());
        return userGasRecordDao.save(userGasRecord);
    }

    public UserEcoRecordResDto calMonthUserEcoPrice() {
        User user = httpSessionService.getUserFromSession();
        Optional<List<UserGasRecord>> optionalUserGasRecords = userGasRecordDao.findByMonthOfNow(user.getUserNo(), LocalDate.now());
        if (optionalUserGasRecords.isEmpty()) {
            throw new SqlNotFoundException(ErrorCode.NOT_FOUND_USER_GAS_RECORD);
        }
        long refuelingPrice = 0;
        long ecoPrice = 0;
        for (UserGasRecord userGasRecord : optionalUserGasRecords.get()) {
            refuelingPrice += userGasRecord.getRefuelingPrice();
            ecoPrice += userGasRecord.getSavingPrice();
        }
        Optional<FoodImage> optionalFoodImage = foodImageDao.findFoodImageByEcoPrice(BigDecimal.valueOf(ecoPrice));
        if (optionalFoodImage.isEmpty()) {
            throw new SqlNotFoundException(ErrorCode.NOT_FOUND_FOOD_IMAGE);
        }
        Optional<List<EcoRecord>> optionalEcoRecords = userGasRecordDao.findSavingPriceByGenderAndAge(user.getGender(), user.getAge());
        List<EcoRecord> rankSavingPrices = optionalEcoRecords.get();
        double rank = rankSavingPrices.indexOf(EcoRecord.builder().userNo(user.getUserNo()).build()) + 1;
        double rankPercentage = (double) Math.round((rank / rankSavingPrices.size() * 100) * 100) / 100;

        double totalSavingPrice = 0;
        for (EcoRecord rankSavingPrice : rankSavingPrices) {
            totalSavingPrice += rankSavingPrice.getSaving_price();
        }
        double average = totalSavingPrice / rankSavingPrices.size();
        return UserEcoRecordResDto.builder().userId(user.getId())
                .gender(user.getGender()).age(user.getAge()).refuelingPrice(refuelingPrice).myEcoPrice(ecoPrice)
                .averageEcoPrice((long)average).imageUrl(optionalFoodImage.get().getImageUrl()).rankPercentage(rankPercentage)
                .build();
    }

}
