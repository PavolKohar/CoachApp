package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.exception.ResourceNotFoundException;
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
import org.springframework.security.access.AccessDeniedException;
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
    public ClientEntity getClientById(UserEntity user,Long clientId) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }

        return client;
    }

    @Override
    public ClientEntity toggleActive(UserEntity user,Long clientId) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }

        client.setActive(!client.getActive());

        return clientRepository.save(client);
    }

    @Override
    public ClientEntity updateContactClient(UserEntity user,Long clientId, ClientContactRequest request) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }

        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPhoneNumber(request.getPhoneNumber());

        return clientRepository.save(client);
    }

    @Override
    public ClientEntity updateAddressClient(UserEntity user,Long clientId, ClientAddressRequest request) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }
        client.setCountry(request.getCountry());
        client.setCity(request.getCity());
        client.setZipCode(request.getZipCode());
        client.setStreet(request.getStreet());

        return clientRepository.save(client);
    }

    @Override
    public ClientEntity updateFitnessClient(UserEntity user,Long clientId, ClientFitnessRequest request) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }
        client.setActivityLevel(request.getActivityLevel());
        client.setGoalWeight(request.getGoalWeight());
        client.setProgram(request.getProgram());

        return clientRepository.save(client);
    }

    @Override
    public void deleteClientById(UserEntity user,Long clientId) {
        ClientEntity client = getClientOrThrow(clientId);

        if (!client.getOwner().getUserId().equals(user.getUserId())){
            throw new AccessDeniedException("You don't have access to this client");
        }

        clientRepository.delete(client);
    }


    // helper

    private ClientEntity getClientOrThrow(Long clientId) {
        return clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with ID: " + clientId));
    }
}
