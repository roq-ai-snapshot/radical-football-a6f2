import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { performanceMetricValidationSchema } from 'validationSchema/performance-metrics';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.performance_metric
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPerformanceMetricById();
    case 'PUT':
      return updatePerformanceMetricById();
    case 'DELETE':
      return deletePerformanceMetricById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPerformanceMetricById() {
    const data = await prisma.performance_metric.findFirst(convertQueryToPrismaUtil(req.query, 'performance_metric'));
    return res.status(200).json(data);
  }

  async function updatePerformanceMetricById() {
    await performanceMetricValidationSchema.validate(req.body);
    const data = await prisma.performance_metric.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePerformanceMetricById() {
    const data = await prisma.performance_metric.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
