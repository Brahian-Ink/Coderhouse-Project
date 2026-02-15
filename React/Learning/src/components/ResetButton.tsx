type ResetButtonProps={
    onReset:() => void;
}; 

export default function ResetButton({onReset}:ResetButtonProps)
{
    return(
            <button
            onClick={onReset}
            className="px-4 py-2 cursor-pointer bg-amber-700 text-white rounded"
            >Reset</button>
    )
}