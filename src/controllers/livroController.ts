import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listarLivros = async (_req: Request, res: Response): Promise<any> => {
  const livros = await prisma.livro.findMany();
  return res.json(livros);
};

export const criarLivro = async (req: Request, res: Response): Promise<any> => {
  const { titulo, autor, isbn, anoPublicacao } = req.body;

  if (!titulo || !autor || !isbn || !anoPublicacao) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, isbn, anoPublicacao: Number(anoPublicacao) },
    });
    return res.status(201).json(novoLivro);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({ erro: "ISBN já cadastrado" });
    }
    return res.status(500).json({ erro: "Erro ao criar livro" });
  }
};

export const atualizarLivro = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { titulo, autor, isbn, anoPublicacao } = req.body;

  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(id) },
      data: { titulo, autor, isbn, anoPublicacao: Number(anoPublicacao) },
    });

    return res.json(livroAtualizado);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return res.status(409).json({ erro: "ISBN já cadastrado" });
    }
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
};

export const deletarLivro = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    await prisma.livro.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
};
