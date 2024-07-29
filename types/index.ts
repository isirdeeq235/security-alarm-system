export interface CardWrapperProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    description?: string;
    BackButtonLabel?: string;
    BackButtonHref?: string;
    BackButtonLink?: string | React.ReactNode;
    showSocial?: boolean;
    showDivider?: boolean;
    onClick?: () => void;
    disable?: boolean;
  }
  
  export interface NavbuttonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    endPoint: string;
    asChild?: boolean;
  }
  
  export interface HeaderProps {
    label: string;
    header: string;
  }
  
  export interface BackButtonProps {
    href?: string | undefined;
    label?: string;
    link?: string | React.ReactNode;
    onClick?: () => void;
    disable?: boolean;
  }
  
  export interface ResponseProps {
    code: number;
    title: string;
    description: string;
    url?: string
  }
  