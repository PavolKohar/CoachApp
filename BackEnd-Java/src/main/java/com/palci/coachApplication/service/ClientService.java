package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.ClientAddressRequest;
import com.palci.coachApplication.model.request.ClientContactRequest;
import com.palci.coachApplication.model.request.ClientFitnessRequest;
import com.palci.coachApplication.model.request.ClientRequest;

import java.util.List;

public interface ClientService {

    ClientEntity createClient(ClientRequest request);

    List<ClientEntity> getAllClientsByOwner(UserEntity user);

    ClientEntity getClientById(UserEntity user,Long clientId);

    ClientEntity toggleActive(UserEntity user,Long clientId);

    ClientEntity updateContactClient(UserEntity user,Long clientId, ClientContactRequest request);

    ClientEntity updateAddressClient(UserEntity user,Long clientId, ClientAddressRequest request);

    ClientEntity updateFitnessClient(UserEntity user,Long clientId, ClientFitnessRequest request);

    void deleteClientById(UserEntity user,Long clientId);
}
