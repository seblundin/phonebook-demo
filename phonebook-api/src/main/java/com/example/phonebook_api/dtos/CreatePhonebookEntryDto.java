package com.example.phonebook_api.dtos;

import jakarta.validation.constraints.NotBlank;

public class CreatePhonebookEntryDto {
  @NotBlank
  private String name;

  @NotBlank
  private String phoneNumber;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

}