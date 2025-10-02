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

@Service
@RequiredArgsConstructor
public class NotesServiceImpl implements NotesService {

    private final UserService userService;
    private final ClientService clientService;
    private final NotesRepository notesRepository;


    @Override
    public NoteEntity createNote(Long userId, NoteRequest request) {
        NoteEntity entity = new NoteEntity();
        entity.setNote(request.getNote());
        entity.setDate(LocalDate.now());

        UserEntity user = userService.getById(userId);
        entity.setOwner(user);

        if (request.getClientId() != null){
            ClientEntity client = clientService.getClientById(request.getClientId());
            entity.setClient(client);
        }

        return notesRepository.save(entity);

    }
}
