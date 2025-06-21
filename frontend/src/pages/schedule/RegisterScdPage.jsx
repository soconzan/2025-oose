import React from "react";
import { useNavigate } from "react-router-dom";
import ScheduleRegister from "../../components/schedule/ScheduleRegister";
import { createSchedule } from "../../api/scheduleApi";

export default function RegisterScdPage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createSchedule(formData);
      navigate("/schedules");
    } catch (err) {
      console.error("등록 에러 상세:", err);

      if (Array.isArray(err.detail)) {
        err.detail.forEach((e) => {
          console.error(`필드: ${e.loc.join(".")}, 문제: ${e.msg}`);
        });

        const messages = err.detail
          .map((e) => `${e.loc.slice(-1)[0]}: ${e.msg}`)
          .join("\n");
        alert(messages);
      } else if (typeof err.detail === "string") {
        alert(err.detail);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <ScheduleRegister
      onSubmit={handleSubmit}
      onCancel={() => navigate("/schedules")}
    />
  );
}