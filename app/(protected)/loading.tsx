import { Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      
      <Spinner style={{ width: '100px', height: '100px' }} className="text-blue-500"/>
    </div>
  );
}
