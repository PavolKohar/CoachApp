package com.palci.coachApplication.repository;

import com.palci.coachApplication.model.entity.TrainingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainingRepository extends JpaRepository<TrainingEntity,Long> {
}
