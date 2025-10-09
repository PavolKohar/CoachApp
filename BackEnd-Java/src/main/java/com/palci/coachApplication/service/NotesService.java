package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import com.palci.coachApplication.model.request.NoteRequest;

import java.util.List;

public interface NotesService {

    NoteEntity createNote(UserEntity user, NoteRequest request);

    List<NoteEntity> getUserNotes(Long userId);

    List<NoteEntity> getClientsNotes(UserEntity user,Long clientId);

    void deleteNoteById(Long id);
}
