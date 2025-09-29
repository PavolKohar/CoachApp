package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.repository.ClientRepository;
import com.palci.coachApplication.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    /**
     * Method to create client
     * @param request Request from frontend
     * @return save to repository request after mapping
     */
    @Override
    public ClientEntity createClient(ClientRequest request) {
        return clientRepository.save(ClientMapper.toEntity(request));
    }
}
