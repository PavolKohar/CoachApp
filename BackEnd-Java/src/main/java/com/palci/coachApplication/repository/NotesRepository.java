package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotesRepository extends JpaRepository<NoteEntity,Long> {
}
