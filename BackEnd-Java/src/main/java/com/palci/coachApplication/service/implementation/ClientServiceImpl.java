package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.ClientAddressRequest;
import com.palci.coachApplication.model.request.ClientContactRequest;
import com.palci.coachApplication.model.request.ClientFitnessRequest;
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

    @Override
    public ClientEntity updateContactClient(Long clientId, ClientContactRequest request) {
        ClientEntity client = clientRepository.findById(clientId).orElseThrow(); // TODO - create own method to fetch client and throw exception
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPhoneNumber(request.getPhoneNumber());

        return clientRepository.save(client);
    }

    @Override
    public ClientEntity updateAddressClient(Long clientId, ClientAddressRequest request) {
        ClientEntity client = clientRepository.findById(clientId).orElseThrow();

        client.setCountry(request.getCountry());
        client.setCity(request.getCity());
        client.setZipCode(request.getZipCode());
        client.setStreet(request.getStreet());

        return clientRepository.save(client);
    }

    @Override
    public ClientEntity updateFitnessClient(Long clientId, ClientFitnessRequest request) {
        ClientEntity client = clientRepository.findById(clientId).orElseThrow();

        client.setActivityLevel(request.getActivityLevel());
        client.setGoalWeight(request.getGoalWeight());
        client.setProgram(request.getProgram());

        return clientRepository.save(client);
    }
}
