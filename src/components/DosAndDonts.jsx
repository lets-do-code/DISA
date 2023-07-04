import "./DosAndDontsStyle.css";
import React, { useState } from "react";

const DosAndDonts = () => {
  const [state, setState] = useState("");

  const handleClick = (index) => {
    setState(index);
  };

  const arr = [
    {
      text: "Cyclone",
      dosdont: {
        dos: [
          "Stay tuned to the radio or TV for updates and instructions from local authorities",
          "Secure your home and belongings as much as possible",
          "Have a disaster kit ready with essentials like food, water, and first aid supplies",
          "Evacuate if instructed to do so by local authorities",
          "Seek shelter in an interior room without windows during the storm",
          "Avoid driving or walking through floodwaters",
          "Stay away from downed power lines or electrical wires",
          "Help your neighbors if you can",
        ],
        dont: [
          "Don't ignore evacuation orders or warnings",
          "Don't underestimate the power and danger of a cyclone",
          "Don't assume that you can outrun a cyclone in a vehicle",
          "Don't use candles or other open flames for lighting during or after the storm",
          "Don't approach or touch wild or stray animals that have been displaced by the cyclone",
          "Don't use generators or other gasoline-powered equipment indoors",
          "Don't spread rumors or false information about the storm",
        ],
      },
    },
    {
      text: "Earthquake",
      dosdont: {
        dos: [
          "Drop down to the ground, take cover under a desk, table or other sturdy furniture, and hold on until the shaking stops",
          "Stay indoors until the shaking stops and you are sure it is safe to exit",
          "Stay away from windows, light fixtures, and tall furniture that could fall on you",
          "If you are in bed, stay there and cover your head with a pillow",
          "If you are outdoors, move to a clear area away from trees, buildings, walls, and power lines",
          "If you are in a vehicle, pull over to a clear location and stop. Avoid bridges, overpasses, and buildings if possible",
          "Listen to the radio or TV for information and instructions from local authorities",
          "Check yourself and others for injuries and provide first aid if necessary",
          "Be prepared for aftershocks, which can occur minutes, hours, or days after the earthquake",
        ],
        dont: [
          "Don't panic or run outside during the earthquake",
          "Don't use elevators",
          "Don't use matches, candles, or any flame as there may be gas leaks",
          "Don't use your phone unless it's an emergency. Keep the phone lines free for emergency calls",
          "Don't touch or move injured people unless they are in immediate danger",
          "Don't enter damaged buildings or structures",
        ],
      },
    },
    {
      text: "Avalanches",
      dosdont: {
        dos: [
          "Check the avalanche forecast and avoid areas with high risk",
          "Carry and know how to use avalanche safety equipment, such as a beacon, probe, and shovel",
          "Stay aware of changing snow conditions and weather",
          "Travel one at a time on slopes",
          "Help others if they are caught in an avalanche",
        ],
        dont: [
          "Don't assume that you are safe just because you are an experienced skier or snowboarder",
          "Don't ski or snowboard alone in avalanche terrain",
          "Don't linger in avalanche runout zones",
          "Don't underestimate the danger of small avalanches",
          "Don't assume that you can outrun an avalanche",
        ],
      },
    },
    {
      text: "Tsunamis",
      dosdont: {
        dos: [
          "Stay tuned to the radio or TV for updates and instructions from local authorities",
          "Move to higher ground immediately if you are in a tsunami warning area",
          "If you are in a boat, go out to sea to avoid the wave",
          "Stay away from the coast until officials announce it is safe to return",
          "Help your neighbors if you can",
        ],
        dont: [
          "Don't stay in low-lying areas near the coast",
          "Don't go to the coast to watch the tsunami",
          "Don't go to the coast to rescue someone",
          "Don't assume that a small wave means the danger has passed",
          "Don't spread rumors or false information about the tsunami",
        ],
      },
    },
    {
      text: "Cold wave",
      dosdont: {
        dos: [
          "Stay indoors as much as possible and keep your home warm",
          "Dress in warm layers of clothing",
          "Cover your head, hands, and feet when going outside",
          "Eat hot and nutritious food and drink warm beverages",
          "Use a space heater or fireplace, but be sure to follow the manufacturer's instructions and safety precautions",
          "Check on elderly neighbors, friends, or family members who may be more vulnerable to the cold",
          "Stay dry and change wet clothing as soon as possible",
          "Keep a supply of food, water, and medications in case you become stranded or unable to leave your home",
          "Insulate pipes and allow faucets to drip a little during cold weather to avoid freezing",
        ],
        dont: [
          "Don't use a gas stove, oven, or grill to heat your home",
          "Don't leave space heaters unattended or use them to dry clothing or blankets",
          "Don't use electric blankets or heating pads while sleeping",
          "Don't drink alcohol or smoke, as they can increase your risk of hypothermia",
          "Don't exert yourself outdoors in the cold, as it can increase your risk of heart attack or stroke",
          "Don't ignore signs of hypothermia or frostbite, such as shivering, confusion, numbness, or bluish skin",
        ],
      },
    },
    {
      text: "Heat Wave",
      dosdont: {
        dos: [
          "Drink plenty of water and stay hydrated",
          "Wear light-colored and loose-fitting clothing",
          "Stay in air-conditioned buildings as much as possible",
          "Take cool showers or baths to lower your body temperature",
          "Limit outdoor activities during the hottest part of the day (usually from 11am to 3pm)",
          "Use sunscreen with at least SPF 30 to protect your skin from the sun's harmful rays",
          "Check on elderly relatives, friends, and neighbors who may be more vulnerable to heat-related illnesses",
          "Use fans or air conditioning to stay cool",
        ],
        dont: [
          "Don't leave children or pets in parked cars",
          "Don't rely on fans as your primary cooling source during extreme heat",
          "Don't drink alcoholic or caffeinated beverages, which can dehydrate you",
          "Don't engage in strenuous outdoor activities during the hottest part of the day",
          "Don't ignore symptoms of heat exhaustion or heat stroke, such as nausea, dizziness, headache, or confusion",
          "Don't rely on natural bodies of water (e.g. lakes, rivers, oceans) to cool off, as they may contain hidden hazards",
        ],
      },
    },
    {
      text: "Lightning",
      dosdont: {
        dos: [
          "Seek shelter in a sturdy building or vehicle during a thunderstorm",
          "Stay indoors for 30 minutes after the last thunder clap",
          "If you are caught outside during a thunderstorm, avoid open fields, hilltops, and high places",
          "If you are in a forest, stay near a lower stand of trees",
          "If you are in a group, spread out to avoid the current traveling between group members",
          "If you are in a boat, get to shore as quickly as possible and find shelter",
          "If you feel your hair standing on end, squat low to the ground on the balls of your feet. Place your hands over your ears and your head between your knees. Make yourself the smallest target possible and minimize your contact with the ground",
          "If someone is struck by lightning, call for emergency medical help immediately and start CPR if needed",
        ],
        dont: [
          "Don't use corded phones, electrical appliances, or equipment during a thunderstorm",
          "Don't take a bath or shower during a thunderstorm",
          "Don't stand near metal objects, such as fences or poles",
          "Don't take shelter under a tree, in a small shed, or in an open structure",
          "Don't touch anything metal, such as a golf club or umbrella",
          "Don't be the tallest object in an open area",
          "Don't assume that you are safe from lightning indoors",
          "Don't wait too long to seek shelter",
        ],
      },
    },
    {
      text: "Floods",
      dosdont: {
        dos: [
          "Follow evacuation orders and move to higher ground if instructed by local authorities",
          "Listen to the radio or TV for information and instructions from local authorities",
          "Stay away from floodwaters and never try to walk, swim, or drive through them",
          "Be aware of the risk of electrocution. Do not touch electrical equipment if you are wet or standing in water",
          "If trapped in a building during a flood, go to the highest level of the building and wait for rescue",
          "If you are outdoors during a flood, move to higher ground and stay away from power lines and electrical wires",
          "Be prepared with a disaster kit that includes food, water, and first aid supplies",
          "Keep important documents and valuables in a waterproof container",
        ],
        dont: [
          "Don't drive through flooded areas, as water may be deeper than it appears",
          "Don't touch floodwaters with bare hands, as they may be contaminated with sewage or other hazardous materials",
          "Don't go near downed power lines or electrical wires",
          "Don't walk in moving water. Six inches of moving water can make you fall",
          "Don't ignore evacuation orders or warnings",
          "Don't use candles or other open flames if gas leaks are suspected",
          "Don't spread rumors or false information about the flood",
          "Don't return to your home until authorities indicate it is safe to do so",
        ],
      },
    },
  ];
  const [dosdont, setdosdont] = useState(arr[0].dosdont);
  console.log(dosdont);

  return (
    <div className="body p-10  ">
      <div className="scrollmenu scrollbar-hide flex justify-center">
        {arr.map((array, index) => (
          //   <button key={index}>
          <button
            className=" p-4 text-xl hover:bg-gray-200 px-4 rounded-xl"
            onClick={() => setdosdont(array.dosdont)}
          >
            {array.text}
          </button>
          //   </button>
        ))}
      </div>
      <div className="divider before:bg-black after:bg-black"></div>
      <div className="dont-do">
        <div className="dos">
          <h1 className="font-semibold text-2xl ">Do's</h1>
          {dosdont.dos.map((item, i) => {
            return <li className="p-2">{item}</li>;
          })}
        </div>
        <div className="dont">
          <h1 className="font-semibold text-2xl ">Don't</h1>
          {dosdont.dont.map((item, i) => {
            return <li className="p-2">{item}</li>;
          })}
        </div>
      </div>
      <div className="divider before:bg-black after:bg-black"></div>
    </div>
  );
};
export default DosAndDonts;
