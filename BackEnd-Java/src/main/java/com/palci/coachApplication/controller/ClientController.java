package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.model.response.ClientResponse;
import com.palci.coachApplication.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/add-new")
    public ResponseEntity<?> addNewClient(@Valid @RequestBody ClientRequest request, BindingResult bindingResult){

        if (bindingResult.hasErrors()){
            Map<String,String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(err->
                    errors.put(err.getField(),err.getDefaultMessage()));
            return ResponseEntity.badRequest().body(Map.of("errors",errors));
        }

        ClientEntity entity = clientService.createClient(request);
        ClientResponse response = ClientMapper.toResponse(entity);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable Long clientId){
        ClientEntity fetchedClient = clientService.getClientById(clientId);
        ClientResponse response = ClientMapper.toResponse(fetchedClient);

        return ResponseEntity.ok(response);
    }


}
