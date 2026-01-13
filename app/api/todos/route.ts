import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server, paywall, evmAddress, svmAddress } from "../../../proxy";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../../lib/db";

const getIdentity = (req: NextRequest) => {
  const wallet = req.headers.get("x-user-wallet");
  const network = req.headers.get("x-user-network") || "unknown";
  return { wallet, network };
};

const handler = async (req: NextRequest) => {
  const { wallet, network } = getIdentity(req);

  if (!wallet) {
    return NextResponse.json(
      { error: "Wallet address required in x-user-wallet header" },
      { status: 400 }
    );
  }

  if (req.method === "GET") {
    const todos = getTodos(network, wallet);
    return NextResponse.json({ todos });
  }

  if (req.method === "POST") {
    const body = await req.json();
    if (!body.text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const todo = createTodo(network, wallet, body.text);
    return NextResponse.json({ todo });
  }

  if (req.method === "PUT") {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const updated = updateTodo(network, wallet, body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ todo: updated });
  }

  if (req.method === "DELETE") {
    // For DELETE, we might expect ID in query or body. Let's support query.
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const success = deleteTodo(network, wallet, id);
    if (!success) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:84532",
        payTo: evmAddress,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: svmAddress,
      },
    ],
    description: "Magic To Do API Access",
    mimeType: "application/json",
    extensions: {
      ...declareDiscoveryExtension({}),
    },
  },
  server,
  undefined,
  paywall
);

export const POST = GET;
export const PUT = GET;
export const DELETE = GET;
