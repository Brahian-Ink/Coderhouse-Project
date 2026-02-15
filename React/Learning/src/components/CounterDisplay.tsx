
type CounterDisplayProps = { //Le decimos que count debe ser si o si numero 
  count: number; 
};

export default function CounterDisplay({ count }: CounterDisplayProps) {
  // Color de numeros
  let color = "";
  if (count > 0) color = "text-green-500";
  else if (count < 0) color = "text-red-500";
  else color = "text-gray-500";

  // Mensaje
  let message="";
  let messageColor="";
  
  if(count === 10)
    {
        message="Límite";
        messageColor="text-yellow-500";
    }
    else if (count === -10)
        {
            message="Límite";
            messageColor="text-yellow-500";
        }

        return(
            <div className="flex flex-col items-center gap-2">
                <p className={`text-bold ${color}`}>{count}</p>
            
                {message &&(
                    <p className={`text-bold ${messageColor}`}>{message}</p>
                )}
            </div>
        );
}
