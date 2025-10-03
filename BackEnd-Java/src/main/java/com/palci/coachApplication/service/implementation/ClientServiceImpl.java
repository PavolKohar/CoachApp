package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.repository.ClientRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final UserService userService;

    /**
     * Method to create client
     * @param request Request from frontend
     * @return save to repository request after mapping
     */
    @Override
    public ClientEntity createClient(ClientRequest request) {
        ClientEntity newClient = ClientMapper.toEntity(request);
        newClient.setOwner(userService.getById(request.getOwnerId()));

        return clientRepository.save(newClient);
    }

    @Override
    public List<ClientEntity> getAllClientsByOwner(UserEntity user) {
        return clientRepository.findAllByOwner(user);
    }

    @Override
    public ClientEntity getClientById(Long clientId) {
        return clientRepository.findById(clientId).orElseThrow();
    }

    @Override
    public ClientEntity toggleActive(Long clientId) {
        ClientEntity client = clientRepository.findById(clientId).orElseThrow();
        client.setActive(!client.getActive());

        return clientRepository.save(client);
    }
}
