package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.mapper.WeightMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.WeightEntity;
import com.palci.coachApplication.model.request.WeightRequest;
import com.palci.coachApplication.model.response.WeightResponse;
import com.palci.coachApplication.repository.ClientRepository;
import com.palci.coachApplication.repository.WeightRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class WeightServiceImpl implements WeightService {

    private final WeightRepository weightRepository;
    private final ClientService clientService;
    private final ClientRepository clientRepository;



    @Override
    public WeightEntity updateCurrentWeight(Long clientId, WeightRequest request) {
        ClientEntity client = clientService.getClientById(clientId);

        double oldWeight = client.getCurrentWeight();
        double newWeight = request.getNewWeight();

        client.setCurrentWeight(newWeight);

        double weightDifference = Math.round((newWeight - oldWeight) * 100.0) / 100.0;

        clientRepository.save(client);

        WeightEntity entity = new WeightEntity();
        entity.setClient(client);
        entity.setOldWeight(oldWeight);
        entity.setNewWeight(newWeight);
        entity.setDate(LocalDate.now());
        entity.setDifference(weightDifference);

        return weightRepository.save(entity);
    }

    @Override
    public List<WeightResponse> getWeightHistoryByClient(ClientEntity entity) {
        List<WeightEntity> entities = weightRepository.findAllByClient(entity);
        return entities.stream().map(WeightMapper::toResponse).toList();
    }
}
