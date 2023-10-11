import Image from "next/image";

export default function PlanCard(props) {
    return (
        <div class="w-full lg:max-w-full lg:flex m-1" key={props.day}>
            <div class="lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
            </div>
            <div class="border border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8">
                    <p class="text-sm text-gray-600 flex items-center">
                        Day {props.day}
                    </p>
                    <div class="text-gray-900 font-bold text-xl mb-2">{props.title}</div>
                    <p class="text-gray-700 text-base">{props.description}</p>
                </div>
                <div class="flex items-center">
                    <Image class="w-10 h-10 rounded-full mr-4" src={props.image} alt="Avatar of Jonathan Reinink" />
                    <div class="text-sm">
                        <p class="text-gray-900 leading-none pb-1">{props.contact}</p>
                        <p class="text-gray-600 pb-1">{props.number}</p>
                        <p class="text-gray-600">{props.cost}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
