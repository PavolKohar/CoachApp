package com.palci.coachApplication.model.response;

import com.palci.coachApplication.Enums.Sex;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Data
public class ClientResponse {

    private Long clientId;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;

    private String country;
    private String city;
    private String zipCode;
    private String street;

    private double height;
    private double originalWeight;
    private double currentWeight;
    private double goalWeight;

    private int activityLevel;
    private LocalDate birthDate;

    private Sex sex;
    private String program;

    private Boolean active;

    private List<WeightResponse> weightResponses;

    public int getAge(){
        if (birthDate == null){
            return 0;
        }else {
            return Period.between(birthDate,LocalDate.now()).getYears();
        }
    }

    public int getProgress(){
        double totalChange = Math.abs(goalWeight - originalWeight);
        double achievedChange = Math.abs(currentWeight - originalWeight);

        if (totalChange == 0) {
            return 0;
        }

        if ((goalWeight>originalWeight)&&(currentWeight<originalWeight)){
            return 0;
        } else if ((goalWeight<originalWeight)&&(currentWeight>originalWeight)) {
            return 0;
        }

        double progress = (achievedChange / totalChange) * 100;
        return (int) Math.round(progress);

    }

    public boolean getTotalProgress(){
        return getProgress()>0;
    }

    public double getWeightDifference(){
        double difference =  Math.abs(originalWeight - currentWeight);
        return Math.round(difference *10) / 10.0;
    }
}
