package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;

public interface ClientService {

    ClientEntity createClient(ClientRequest request);
}
