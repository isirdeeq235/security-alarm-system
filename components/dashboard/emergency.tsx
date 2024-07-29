"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RequestLoader } from "@/components/dashboard/request-loader";
import { RespondLoader } from "@/components/dashboard/respond-loader";
import { SubmittingRequest } from "@/components/dashboard/submitting-request";

import axios from "axios";
import toast from "react-hot-toast";

const Emergency = ({ id }: { id: string }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchIsRequestValue = async () => {
      try {
        const response = await axios.post("/api/dashboard/emergency/check", {
          userId: id,
        });

        const { isRequest, isRespond } = response.data;
        console.log(response);

        setIsRequesting(isRequest);
        setIsResponding(isRespond);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIsRequestValue();

    const intervalId = setInterval(fetchIsRequestValue, 1000);

    return () => clearInterval(intervalId);
  }, [id]); //review this line

  if (isRequesting) return <RequestLoader />;
  if (isResponding) return <RespondLoader />;
  if (isSubmitting) return <SubmittingRequest />;

  const handleValueChange = async (data: string, department: string) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          };

          const helpData = {
            userId: id,
            details: data,
            department,
            location: location,
          };

          try {
            const response = await axios.post("/api/dashboard/emergency", {
              helpData,
            });

            if (response.data.code === 200) {
              setSelectedValue("");
              setIsRequesting(true);
              setIsSubmitting(false);
            } else {
              toast.error(response.data.message);
              setIsSubmitting(false);
            }
          } catch (error) {
            toast.error("Internal Server Error");
            setIsSubmitting(false);
          }
        },
        (error) => {
          toast.error("Failed to get location");
          setIsSubmitting(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1 className="flex items-center justify-center font-extrabold text-[40px] -mt-5">
        GET HELP FROM
      </h1>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-3xl">Fire Department</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Select
                value={selectedValue}
                onValueChange={async (data) => {
                  handleValueChange(data, "Fire Department");
                  setIsSubmitting(true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Details" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Fire Suppression">
                      Fire Suppression
                    </SelectItem>
                    <SelectItem value="Rescue Operation">
                      Rescue Operation
                    </SelectItem>
                    <SelectItem value="Emergency Medical Services">
                      Emergency Medical Services
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-3xl">
                Emergency Medical Services
              </CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Select
                value={selectedValue}
                onValueChange={(data) => {
                  handleValueChange(data, "Emergency Medical Services");
                  setIsSubmitting(true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Details" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Ambulance transportation">
                      Ambulance transportation
                    </SelectItem>
                    <SelectItem value="Paramedic Services">
                      Paramedic Services
                    </SelectItem>
                    <SelectItem value="Medical Emergency Response">
                      Medical Emergency Response
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-3xl">Police Department</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Select
                value={selectedValue}
                onValueChange={(data) => {
                  handleValueChange(data, "Police Department");
                  setIsSubmitting(true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Details" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Law Enforcement">
                      Law Enforcement
                    </SelectItem>
                    <SelectItem value="Crime Prevention and Investigation">
                      Crime Prevention and Investigation
                    </SelectItem>
                    <SelectItem value="Traffic Control and Accident">
                      Traffic Control and Accident
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-3xl">911 Operators</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Select
                value={selectedValue}
                onValueChange={(data) => {
                  handleValueChange(data, "911 Operators");
                  setIsSubmitting(true);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Details" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Emergency Call Answering">
                      Emergency Call Answering
                    </SelectItem>
                    <SelectItem value="Call Screening and Prioritization">
                      Call Screening and Prioritization
                    </SelectItem>
                    <SelectItem value="Resource Allocation and Coordination">
                      Resource Allocation and Coordination
                    </SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Emergency;
