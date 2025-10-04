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

    ClientEntity getClientById(Long clientId);

    ClientEntity toggleActive(Long clientId);

    ClientEntity updateContactClient(Long clientId, ClientContactRequest request);

    ClientEntity updateAddressClient(Long clientId, ClientAddressRequest request);

    ClientEntity updateFitnessClient(Long clientId, ClientFitnessRequest request);
}
