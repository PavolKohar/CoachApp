package com.palci.coachApplication.controller;

import com.palci.coachApplication.mapper.ClientMapper;
import com.palci.coachApplication.mapper.NoteMapper;
import com.palci.coachApplication.mapper.WeightMapper;
import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.entity.WeightEntity;
import com.palci.coachApplication.model.request.ClientRequest;
import com.palci.coachApplication.model.request.NoteRequest;
import com.palci.coachApplication.model.request.WeightRequest;
import com.palci.coachApplication.model.response.ClientResponse;
import com.palci.coachApplication.model.response.ClientResponseSmall;
import com.palci.coachApplication.model.response.NoteResponse;
import com.palci.coachApplication.model.response.WeightResponse;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.NotesService;
import com.palci.coachApplication.service.WeightService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ClientController {

    private final ClientService clientService;
    private final WeightService weightService;
    private final NotesService notesService;

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
        List<WeightResponse> weightResponses = weightService.getWeightHistoryByClient(fetchedClient);
        ClientResponse response = ClientMapper.toResponse(fetchedClient);
        response.setWeightResponses(weightResponses);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{clientId}/small")
    public ResponseEntity<ClientResponseSmall> getClientByIdSmall(@PathVariable Long clientId){
        ClientEntity fetchedClient = clientService.getClientById(clientId);
        ClientResponseSmall responseSmall = ClientMapper.toSmallResponse(fetchedClient);

        return ResponseEntity.ok(responseSmall);
    }

    @PostMapping("{clientId}/update-weight")
    public ResponseEntity<WeightResponse> updateWeight(@PathVariable Long clientId, @RequestBody WeightRequest weightRequest){
        WeightEntity entity =  weightService.updateCurrentWeight(clientId,weightRequest);
        WeightResponse response = WeightMapper.toResponse(entity);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all-notes/{clientId}")
    public ResponseEntity<List<NoteResponse>> getAllClientNotes(@PathVariable Long clientId){
        List<NoteEntity> entities = notesService.getClientsNotes(clientId);
        List<NoteResponse> responses = entities.stream().map(NoteMapper::toResponse).toList();

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/add-note/{userId}/{clientId}")
    public ResponseEntity<NoteResponse> addClientNote(@PathVariable Long userId, @PathVariable Long clientId, @RequestBody NoteRequest request){
        NoteEntity entity = notesService.createNote(userId,request);
        ClientEntity client = clientService.getClientById(clientId);
        entity.setClient(client);
        NoteResponse response = NoteMapper.toResponse(entity);

        return ResponseEntity.ok(response);
    }

    @PostMapping("{clientId}/toggle-active")
    public ResponseEntity<ClientResponse> toggleActive(@PathVariable Long clientId){
        ClientEntity client = clientService.toggleActive(clientId);
        ClientResponse response = ClientMapper.toResponse(client);

        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/remove-weight-record/{id}")
    public ResponseEntity<Void> removeWeightRecord(@PathVariable Long id){
        weightService.deleteRecordById(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/remove-note/{id}")
    public ResponseEntity<Void> removeNote(@PathVariable Long id){
        notesService.deleteNoteById(id);

        return ResponseEntity.noContent().build();
    }


}
