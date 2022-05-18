package com.example.bareuda.mapper;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Result;
import org.springframework.stereotype.Component;

@Component
public interface BaumannMapper {
    public Answer findById(String mb_id);
    public Result getResult(Answer answer);
}
