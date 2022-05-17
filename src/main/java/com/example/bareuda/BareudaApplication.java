package com.example.bareuda;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan(value = {"com.example.bareuda.mapper"})
@SpringBootApplication
public class BareudaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BareudaApplication.class, args);
	}

}
