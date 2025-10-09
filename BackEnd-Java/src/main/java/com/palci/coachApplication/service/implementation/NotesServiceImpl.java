package com.palci.coachApplication.service.implementation;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.NoteRequest;
import com.palci.coachApplication.repository.NotesRepository;
import com.palci.coachApplication.service.ClientService;
import com.palci.coachApplication.service.NotesService;
import com.palci.coachApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotesServiceImpl implements NotesService {

    private final UserService userService;
    private final ClientService clientService;
    private final NotesRepository notesRepository;


    @Override
    public NoteEntity createNote(UserEntity user, NoteRequest request) {
        NoteEntity entity = new NoteEntity();
        entity.setNote(request.getNote());
        entity.setDate(LocalDate.now());


        entity.setOwner(user);

        if (request.getClientId() != null){
            ClientEntity client = clientService.getClientById(user,request.getClientId());
            entity.setClient(client);
        }

        return notesRepository.save(entity);

    }

    @Override
    public List<NoteEntity> getUserNotes(Long userId) {
        UserEntity owner = userService.getById(userId);

        return notesRepository.findAllByOwner(owner);
    }

    @Override
    public List<NoteEntity> getClientsNotes(UserEntity user,Long clientId) {


        ClientEntity client = clientService.getClientById(user,clientId);

        return notesRepository.findAllByClient(client);
    }

    @Override
    public void deleteNoteById(Long id) {
        notesRepository.deleteById(id);
    }
}
