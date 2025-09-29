package com.palci.coachApplication.mapper;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;

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

        return entity;
    }
    
}
