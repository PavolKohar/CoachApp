package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.WeightEntity;
import com.palci.coachApplication.model.request.WeightRequest;
import com.palci.coachApplication.model.response.WeightResponse;

import java.util.List;

public interface WeightService {


    WeightEntity updateCurrentWeight(Long clientId,WeightRequest request);

    List<WeightResponse> getWeightHistoryByClient(ClientEntity entity);
}
