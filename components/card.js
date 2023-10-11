export default function PlanCard(props) {
    return (
        <div className="w-full w-full lg:flex my-1 bg-cyan-500 p-2">
            <div className="border w-full border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-2">
                    <p className="text-sm text-gray-600 flex items-center">
                        Day {props.day}
                    </p>
                    <div className="text-gray-900 font-bold text-xl">{props.title}</div>
                </div>
                <ul className="list-disc">
                    {props.description?.map((i)=>(
                        <li key={i} className="text-gray-700 text-base ml-5 m-2">{i}</li>
                    ))}
                </ul>
                <div className="flex items-center">
                    <div className="text-sm">
                        <div className="flex">
                        {props.contact.map((i)=>(
                            <div className="m-1 pl-1" key={i.name}>
                                <p className="text-gray-900 leading-none pb-1">{i.name}</p>
                                <p className="text-gray-600 pb-1">{i.number}</p>
                            </div>
                        ))}
                        </div>
                        <p className="text-gray-600 pl-2">{props.cost}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}