package com.palci.coachApplication.service;

import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.request.NoteRequest;

public interface NotesService {

    NoteEntity createNote(Long userId,NoteRequest request);
}
