package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.WeightEntity;
import com.palci.coachApplication.model.response.WeightResponse;

public class WeightMapper {


    public static WeightResponse toResponse(WeightEntity entity){
        WeightResponse response = new WeightResponse();
        response.setOldWeight(entity.getOldWeight());
        response.setDate(entity.getDate());
        response.setNewWeight(entity.getNewWeight());
        response.setDifference(entity.getDifference());

        return response;
    }
}
