package com.palci.coachApplication;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class LoginUITest {

    private WebDriver webDriver;

    @BeforeEach
    void setUp(){
        webDriver = new ChromeDriver();
    }


    @Test
    void loginTest(){
        webDriver.get("http://localhost:5173");
        webDriver.manage().window().maximize();
        WebElement loginButton = webDriver.findElement(By.id("loginButton"));
        loginButton.click();
        WebElement username = webDriver.findElement(By.id("username"));
        username.sendKeys("pavolkohar");
        username.sendKeys(Keys.ENTER);
        WebElement password = webDriver.findElement(By.id("password"));
        password.sendKeys("palopalo");
        password.sendKeys(Keys.ENTER);

    }
}
