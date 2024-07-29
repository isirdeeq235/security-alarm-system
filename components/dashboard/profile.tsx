"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Icon from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Form from "@/components/ui/form";
import * as Schema from "@/schemas";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import AnimatedDots from "@/components/ui/animated-dot";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const Profile = ({ id, user }: { id: string; user: any }) => {
  const router = useRouter();

  const form = useForm<Schema.ProfileType>({
    resolver: zodResolver(Schema.ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const pform = useForm<Schema.ProfilePasswordType>({
    resolver: zodResolver(Schema.ProfilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState<boolean>(false);

  const [matricError, setmatricError] = React.useState<string>("");

  const [isProfileUpdate, setIsProfileUpdate] = React.useState<boolean>(false);

  useEffect(() => {
    if (user.email === null) {
      setIsProfileUpdate(true);
    }
  }, [user.email]);

  const updateUserImage = async (imageUrl: string) => {
    const userData = {
      id,
      imageUrl,
    };
    try {
      const response = await axios.post("/api/dashboard/profile/image", {
        userData,
      });

      const { code, message } = response.data;

      if (code === 200) return toast.success(message), router.refresh();
      return toast.error(message);
    } catch (error) {
      return toast.error("Failed to update user profile image");
    }
  };

  const handleUploadSuccess = (result: any) => {
    if (result.event !== "success") return;
    const info = result.info;
    const imageUrl = info.secure_url;
    updateUserImage(imageUrl);
  };

  return (
    <>
      {isProfileUpdate && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Update Your Profile!</AlertTitle>
          <AlertDescription>
            Update your profile and enjoy a better experience on the site.
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="account" className="w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(async (data) => {
              const userData = {
                data,
                id,
              };
              try {
                const response = await axios.post("/api/dashboard/profile", {
                  userData,
                });
                const { code, message } = response.data;

                if (code === 200)
                  return toast.success(message), form.reset(), router.refresh();
                return toast.error(message);
              } catch (error) {
                console.log(error);
              }
            })}
            noValidate
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you are
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Flex
                  gap="3"
                  align="center"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="relative inline-block">
                    <Avatar
                      size="6"
                      src={user.image}
                      radius="full"
                      fallback="DP"
                    
                    />
                    <CldUploadWidget
                      options={{
                        sources: ["local"],
                        fieldName: "Security Alert System",
                        multiple: false,
                        maxFiles: 1,
                        showAdvancedOptions: false,
                        cropping: false,
                        defaultSource: "local",
                        styles: {
                          palette: {
                            window: "#FFFFFF",
                            windowBorder: "#90A0B3",
                            tabIcon: "#0078FF",
                            menuIcons: "#5A616A",
                            textDark: "#000000",
                            textLight: "#FFFFFF",
                            link: "#0078FF",
                            action: "#FF620C",
                            inactiveTabIcon: "#0E2F5A",
                            error: "#F44235",
                            inProgress: "#0078FF",
                            complete: "#20B832",
                            sourceBg: "#E4EBF1",
                          },
                          fonts: {
                            default: null,
                            "'Fira Sans', sans-serif": {
                              url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                              active: true,
                            },
                          },
                        },
                      }}
                      uploadPreset="fuqfejut"
                      onSuccess={handleUploadSuccess}
                    >
                      {({ open }) => (
                        <Button
                          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full"
                          onClick={() => open()}
                          type="button"
                        >
                          Upload
                        </Button>
                      )}
                    </CldUploadWidget>
                  </div>
                </Flex>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin:"30px 0px"
                  }}
                >
                  <Text as="div" size="2" weight="bold">
                    {user.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {user.email}
                  </Text>
                </Box>
                <Separator my="3" size="4" />
                <Form.Form {...form}>
                  <Form.FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Form.FormItem>
                        <Form.FormLabel>Name </Form.FormLabel>
                        <Form.FormControl>
                          <Input
                            {...field}
                            placeholder=""
                            type="text"
                            name="name"
                          />
                        </Form.FormControl>
                        <Form.FormMessage />
                      </Form.FormItem>
                    )}
                  />
                  <Form.FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Form.FormItem>
                        <Form.FormLabel>Email </Form.FormLabel>
                        <Form.FormControl>
                          <Input
                            {...field}
                            placeholder=""
                            type="email"
                            name="email"
                          />
                        </Form.FormControl>
                        <Form.FormMessage />
                      </Form.FormItem>
                    )}
                  />
                </Form.Form>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full space-y-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      Please wait
                      <AnimatedDots />
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="password">
          <form
            className="space-y-4"
            onSubmit={pform.handleSubmit(async (data) => {
              const userData = {
                data,
                id,
              };
              try {
                const response = await axios.post(
                  "/api/dashboard/profile/password",
                  {
                    userData,
                  }
                );
                const { code, message } = response.data;

                if (code === 200) return toast.success(message), pform.reset();
                return toast.error(message);
              } catch {
                return toast.error("Internal Server Error");
              }
            })}
            noValidate
          >
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you will be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form.Form {...pform}>
                  <Form.FormField
                    control={pform.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <Form.FormItem>
                        <Form.FormLabel>Current Password </Form.FormLabel>
                        <Form.FormControl>
                          <Input
                            {...field}
                            placeholder="********************"
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            suffix={
                              showCurrentPassword ? (
                                <Icon.IoEyeOutline
                                  className="select-none"
                                  onClick={() => setShowCurrentPassword(false)}
                                />
                              ) : (
                                <Icon.IoEyeOffOutline
                                  className="select-none"
                                  onClick={() => setShowCurrentPassword(true)}
                                />
                              )
                            }
                          />
                        </Form.FormControl>
                        <Form.FormMessage matricError={matricError} />
                      </Form.FormItem>
                    )}
                  />
                  <Form.FormField
                    control={pform.control}
                    name="newPassword"
                    render={({ field }) => (
                      <Form.FormItem>
                        <Form.FormLabel>New Password </Form.FormLabel>
                        <Form.FormControl>
                          <Input
                            {...field}
                            placeholder="********************"
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            suffix={
                              showNewPassword ? (
                                <Icon.IoEyeOutline
                                  className="select-none"
                                  onClick={() => setShowNewPassword(false)}
                                />
                              ) : (
                                <Icon.IoEyeOffOutline
                                  className="select-none"
                                  onClick={() => setShowNewPassword(true)}
                                />
                              )
                            }
                          />
                        </Form.FormControl>
                        <Form.FormMessage />
                      </Form.FormItem>
                    )}
                  />
                  <Form.FormField
                    control={pform.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <Form.FormItem>
                        <Form.FormLabel>Confirm New Password </Form.FormLabel>
                        <Form.FormControl>
                          <Input
                            {...field}
                            placeholder="********************"
                            type={showConfirmNewPassword ? "text" : "password"}
                            name="confirmNewPassword"
                            suffix={
                              showConfirmNewPassword ? (
                                <Icon.IoEyeOutline
                                  className="select-none"
                                  onClick={() =>
                                    setShowConfirmNewPassword(false)
                                  }
                                />
                              ) : (
                                <Icon.IoEyeOffOutline
                                  className="select-none"
                                  onClick={() =>
                                    setShowConfirmNewPassword(true)
                                  }
                                />
                              )
                            }
                          />
                        </Form.FormControl>
                        <Form.FormMessage />
                      </Form.FormItem>
                    )}
                  />
                </Form.Form>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full space-y-2"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      Please wait
                      <AnimatedDots />
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Profile;
