package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.model.response.ClientResponse;
import com.palci.coachApplication.model.response.ClientResponseSmall;
import com.palci.coachApplication.repository.UserRepository;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
public class ClientMapper {



    public static ClientEntity toEntity(ClientRequest request){
        ClientEntity entity = new ClientEntity();
        entity.setFirstName(request.getFirstName());
        entity.setLastName(request.getLastName());
        entity.setEmail(request.getEmail());
        entity.setPhoneNumber(request.getPhoneNumber());
        entity.setCountry(request.getCountry());
        entity.setCity(request.getCity());
        entity.setZipCode(request.getZipCode());
        entity.setStreet(request.getStreet());
        entity.setHeight(request.getHeight());
        entity.setOriginalWeight(request.getOriginalWeight());
        entity.setGoalWeight(request.getGoalWeight());
        entity.setSex(request.getSex());
        entity.setProgram(request.getProgram());
        entity.setActivityLevel(request.getActivityLevel());
        entity.setBirthDate(request.getBirthDate());

        return entity;
    }

    public static ClientResponse toResponse(ClientEntity entity){
        ClientResponse response = new ClientResponse();

        response.setClientId(entity.getClientId());
        response.setFirstName(entity.getFirstName());
        response.setLastName(entity.getLastName());
        response.setEmail(entity.getEmail());
        response.setPhoneNumber(entity.getPhoneNumber());
        response.setCountry(entity.getCountry());
        response.setCity(entity.getCity());
        response.setZipCode(entity.getZipCode());
        response.setStreet(entity.getStreet());
        response.setHeight(entity.getHeight());
        response.setOriginalWeight(entity.getOriginalWeight());
        response.setCurrentWeight(entity.getCurrentWeight());
        response.setGoalWeight(entity.getGoalWeight());
        response.setSex(entity.getSex());
        response.setProgram(entity.getProgram());
        response.setActive(entity.getActive());
        response.setActivityLevel(entity.getActivityLevel());
        response.setBirthDate(entity.getBirthDate());

        return response;
    }

    public static ClientResponseSmall toSmallResponse(ClientEntity entity){
        ClientResponseSmall response = new ClientResponseSmall();
        response.setClientId(entity.getClientId());
        response.setFirstName(entity.getFirstName());
        response.setLastName(entity.getLastName());
        response.setCurrentWeight(entity.getCurrentWeight());
        response.setPhoneNumber(entity.getPhoneNumber());
        response.setEmail(entity.getEmail());
        response.setActive(entity.getActive());

        return response;
    }

}
