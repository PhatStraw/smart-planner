import React, { useEffect, useState } from "react";
import NavBar from 'components/components/navbar/newNav';
import usePlans from 'components/hooks/usePlans';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Button from "components/components/Button";
export default function SelectedPlan() {
    const plansState = usePlans()

    const handleDownloadPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
    
        // Add content to the PDF
        page.drawText(plansState.selectedPlan.title, {
            x: 50,
            y: height - 50,
            size: 24,
            font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        });
    
        let yOffset = height - 100;
    
        // Add itinerary details
        for (const itinerary of plansState.selectedPlan.itinerary) {
            yOffset -= 30;
            page.drawText(`Day ${itinerary.day}: ${itinerary.title}`, {
                x: 50,
                y: yOffset,
                size: 18,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            });
    
            yOffset -= 20;
            for (const description of itinerary.description) {
                page.drawText(description, {
                    x: 70,
                    y: yOffset,
                    size: 12,
                    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                });
                yOffset -= 15;
            }
    
            yOffset -= 20;
            page.drawText(`Cost: ${itinerary.cost}`, {
                x: 70,
                y: yOffset,
                size: 12,
                font: await pdfDoc.embedFont(StandardFonts.Helvetica),
            });
    
            yOffset -= 20;
            for (const contact of itinerary.contact) {
                page.drawText(`${contact.name}: ${contact.number}`, {
                    x: 70,
                    y: yOffset,
                    size: 12,
                    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                });
                yOffset -= 15;
            }
    
            yOffset -= 30;
        }
    
        // Generate the PDF file
        const pdfBytes = await pdfDoc.save();
    
        // Create a blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'selectedPlan.pdf';
        link.click();
    };

console.log(JSON.stringify(plansState.selectedPlan))
    return (
        <div>
            <NavBar />
            {plansState.selectedPlan.length > 0 ? (
                <div className="m-auto pt-24 rounded w-[100%] max-w-[1280px]">
                    <Carousel showThumbs={false} showStatus={false} showArrows={false}>
                        {plansState.selectedPlan.image.map((i) => (
                            <div key={i}>
                                <img
                                    src={i}
                                    alt=""
                                    className="rounded-lg shadow-lg max-h-[387px] md:max-h-[560px]"
                                />
                            </div>
                        ))}
                    </Carousel>
                    <div className="w-full m-3 rounded pt-4 flex flex-col justify-between leading-normal">
                        <div className="pb-2">
                            <p className="text-3xl mb-2 text-gray-600 flex items-center">
                                {plansState.selectedPlan.title}
                            </p>
                            <div className="w-1/6">
                                <Button label={"Download"} small={true} onClick={handleDownloadPDF} />
                            </div>
                            {/* <div className="text-gray-900 font-bold text-xl text-left">{plansState.selectedPlan.total}</div> */}
                        </div>
                        {plansState.selectedPlan.itinerary.map((i) => (
                            <div key={i.day} className="w-full rounded p-3 flex border-slate-300 mb-1 flex-col justify-between leading-normal border-t">
                                <div className="mb-3">
                                    <p className="text-xl mb-2 text-gray-600 flex items-center">
                                        Day {i.day}
                                    </p>
                                    <div className="text-gray-900 font-bold text-xl text-left">{i.title}</div>
                                </div>
                                <ul className="list-disc">
                                    {i.description?.map((i) => (
                                        <li key={i} className="text-gray-700 text-base ml-5 m-2">{i}</li>
                                    ))}
                                </ul>
                                <div className="flex items-left">
                                    <div className="text-xl">
                                        <div className="flex flex-wrap">
                                            {i.contact.map((i) => (
                                                <div className="m-1 pl-1" key={i.name}>
                                                    <p className="text-gray-900 leading-none pb-1">{i.name}</p>
                                                    <p className="text-gray-600 pb-1">{i.number}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-gray-900 font-bold">{i.cost} Total</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : <div>Nope</div>}
        </div>
    )
}
