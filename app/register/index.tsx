// Step 1: User registration form (name, email, password)
import React from "react";
import { AppScreen } from "@presentation/components/ui/AppScreen";
import { RegisterUserStep } from "@presentation/components/register/RegisterUserStep";

export default function Register() {
  return (
    <AppScreen>
      <RegisterUserStep />
    </AppScreen>
  );
}
