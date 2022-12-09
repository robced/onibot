import Discord from "discord.js";
import dotenv from "dotenv";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import { Player } from "discord-player";

dotenv.config();
const TOKEN = process.env.TOKEN;
