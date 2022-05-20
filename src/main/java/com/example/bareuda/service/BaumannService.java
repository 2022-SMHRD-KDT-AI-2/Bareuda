package com.example.bareuda.service;

import com.example.bareuda.dto.BaumannTestForm;
import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Result;

public interface BaumannService {
    public void createBaumannResult(Member member, BaumannTestForm form);
    public Result getBaumannResult(Member member);
    public Answer getAnswer(String mb_id);
    public Answer findById(String mb_id);
}
