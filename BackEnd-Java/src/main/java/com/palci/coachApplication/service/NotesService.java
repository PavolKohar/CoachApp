package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.request.NoteRequest;

import java.util.List;

public interface NotesService {

    NoteEntity createNote(Long userId,NoteRequest request);

    List<NoteEntity> getUserNotes(Long userId);

    List<NoteEntity> getClientsNotes(Long clientId);

    void deleteNoteById(Long id);
}
