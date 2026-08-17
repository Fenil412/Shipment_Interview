import Vessel from '../models/Vessel.js';
import Voyage from '../models/Voyage.js';
import Container  from '../models/Container.js';
import { getNextId} from '../models/Counter.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

function computerEffectiveRoute(hops) {
    const route = [];
    hops.forEach(h => {
        if(h.from && !route.includes(h.from)) route.push(h.from);
        if(h.to && !route.includes(h.to)) route.push(h.to);
    })
    return route;
}

//1
export const createVessel = catchAsync(async (req, res) => {
    const { name, vessel_number, capacity } = req.body;
    if(!name || !vessel_number || capacity === undefined || capacity === null ) {
        throw new AppError('name,vessel_number and capacity are require', 400, 'VALIDATION_ERROR');
    }
    if(!Number.isInteger(capacity) || capacity <= 0) {
        throw new AppError('capacity must be a whole number greater than 0', 400, 'VALIDATION_ERROR');
    }
    
    const existing = await Vessel.findOne({ vessel_number});
    if(existing) {
        throw new AppError(`A vessel with number ${vessel_number} already exists`, 409, 'VESSEL_ALREADY_EXISTS');
    }

    const id = await getNextId('v');
    const vessel = await Vessel.create ({
        _id : id,
        name,
        vessel_number,
        capacity
    });

    return res.status(201).json(vessel.toJSON());
});


//2.
export const createVoyage = catchAsync(async (req, res) => {
    const { vessel_id, voyage_number, destination } = req.body;
    if(!vessel_id || !voyage_number || !destination ) {
        throw new AppError('vessel_id,vessel_number and destination are require', 400, 'VALIDATION_ERROR');
    }
    const vessel = await Vessel.findById(vessel_id);
    if(!vessel) {
        throw new AppError(`No vessel found with id ${vessel_id}`, 404, 'VESSEL_NOT_FOUND');
    }
    const existing = await Voyage.findOne({ voyage_number});
    if(existing) {
        throw new AppError(`A voyage with number ${voyage_number} already exists`, 409, 'VESSEL_ALREADY_EXISTS');
    }

    const id = await getNextId('vy');
    const voyage = await Voyage.create ({
        _id : id,
        vessel_id,
        voyage_number,
        destination,
        status: 'PLANNED',
        hops: [],
        effective_route: []
    });

    return res.status(201).json(vessel.toJSON());
});

// export const addContainer = catchAsync(async (req, res) => {
//     const {voyage_id} = req.param;
//     const {container_number}
// )};

