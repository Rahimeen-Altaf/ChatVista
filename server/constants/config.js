const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

const CHATVISTA_TOKEN = "chatvista-token";

export { corsOptions, CHATVISTA_TOKEN };
