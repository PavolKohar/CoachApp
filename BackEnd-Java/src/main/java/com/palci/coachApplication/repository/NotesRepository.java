package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.ClientEntity;
import com.palci.coachApplication.model.entity.NoteEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotesRepository extends JpaRepository<NoteEntity,Long> {

    List<NoteEntity> findAllByOwner(UserEntity owner);
    List<NoteEntity> findAllByClient(ClientEntity client);
}
