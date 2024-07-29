"use client";

import * as Card from "@/components/ui/card";
import { BackButton } from "@/components/auth/back-button";
import { CardWrapperProps } from "@/types";

export const CardWrapper = ({
  children,
  title,
  icon,
  description,
  BackButtonLabel,
  BackButtonHref,
  BackButtonLink,
  onClick,
  disable,
}: CardWrapperProps) => {
  return (
    <Card.Card className="w-[450px] shadow-slate-500">
      <Card.CardHeader className="flex flex-col gap-y-2 w-full items-center justify-center">
        <Card.CardTitle className="text-xl">{icon}</Card.CardTitle>
        <Card.CardTitle className="text-xl">{title}</Card.CardTitle>
        <Card.CardDescription className="items-center justify-center">
          {description}
        </Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent> {children}</Card.CardContent>
      <Card.CardFooter>
        <BackButton
          href={BackButtonHref}
          label={BackButtonLabel}
          link={BackButtonLink}
          onClick={onClick}
          disable={disable}
        />
      </Card.CardFooter>
    </Card.Card>
  );
};
