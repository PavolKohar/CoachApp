package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.ClientRequest;

import java.util.List;

public interface ClientService {

    ClientEntity createClient(ClientRequest request);

    List<ClientEntity> getAllClientsByOwner(UserEntity user);

    ClientEntity getClientById(Long clientId);

    ClientEntity toggleActive(Long clientId);
}
