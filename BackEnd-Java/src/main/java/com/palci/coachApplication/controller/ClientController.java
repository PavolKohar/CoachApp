package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.model.response.ClientResponse;
import com.palci.coachApplication.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/add-new")
    public ResponseEntity<ClientResponse> addNewClient(@RequestBody ClientRequest request){
        ClientEntity entity = clientService.createClient(request);
        ClientResponse response = ClientMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }


}
