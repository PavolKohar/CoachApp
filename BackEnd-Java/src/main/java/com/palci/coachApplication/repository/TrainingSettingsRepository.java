package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.TrainingSettingsEntity;
import com.palci.coachApplication.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TrainingSettingsRepository extends JpaRepository<TrainingSettingsEntity,Long> {

    List<TrainingSettingsEntity> findAllByUser(UserEntity user);
}
