import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const uri = "mongodb+srv://istaprasadpatra:Ista31@cluster0.j3q5e0x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

