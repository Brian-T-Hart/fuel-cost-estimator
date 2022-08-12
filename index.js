class GasCostCalculator {

    constructor() {
        this.data = {};
        this.result = {};
    }// constructor

    calculate(data) {
        let cost = (data.miles / data.mpg) * data.fuelCost;
        let cost2 = 0;

        if (data.mpg2) {
            cost2 = (data.miles / data.mpg2) * data.fuelCost;
        }

        let result = {
            fuelCost: cost.toFixed(2),
            fuelCost2: cost2.toFixed(2),
            vehicle: this.data.vehicle,
            vehicle2: this.data.vehicle2
        }

        return result;
    }// calculate

    getData() {
        return this.data;
    }

    getForm() {
        let formEl = document.createElement('form');
        formEl.id = 'fuel-cost-form';
        formEl.innerHTML = 
            `
                <fieldset id="general-info">
                    <h3>Enter Vehicle Info</h3>
                    <div class="field">
                        <label for="vehicle">Vehicle</label>
                        <input id="vehicle" name="vehicle" placeholder="Civic" type="text" />
                    </div>

                    <div class="field">
                        <label for="miles">Annual Mileage</label>
                        <input id="miles" min="1" name="miles" placeholder="10000" type="number" required />
                    </div>

                    <div class="field">
                        <label for="fuel-cost">Cost per gallon of gas</label>
                        <input id="fuel-cost" min="1" name="fuel-cost" step="any" type="number" placeholder="5" required />
                    </div>

                    <div class="field">
                        <label for="mpg">Fuel Efficiency (miles per gallon)</label>
                        <input id="mpg" min="1" name="mpg" placeholder="20" type="number" required />
                    </div>
                </fieldset>

                <fieldset class="hidden" id="vehicle-2-info">
                    <h3>Vehicle 2</h3>
                    <div class="field">
                        <label for="vehicle2">Vehicle 2</label>
                        <input id="vehicle2" name="vehicle2" placeholder="Prius" type="text" />
                    </div>

                    <div class="field">
                        <label for="mpg2">Fuel Efficiency (miles per gallon)</label>
                        <input id="mpg2" min="1" name="mpg2" placeholder="20" type="number" />
                    </div>
                </fieldset>

                <input id="fuel-cost-submit" type="submit" value="Submit" />
        `;

        let compareLink = document.createElement('span');
        compareLink.id = 'compare-link';
        compareLink.innerText = 'compare';
        compareLink.addEventListener('click', () => {
            let vehicle2 = document.getElementById('vehicle-2-info');
            if (vehicle2.classList.contains('hidden')) {
                vehicle2.classList.remove('hidden');
            } else {
                vehicle2.classList.add('hidden');
            }
        });

        formEl.appendChild(compareLink);

        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            let formData = new FormData(formEl);

            this.data.fuelCost = Number(formData.get('fuel-cost'));
            this.data.miles = Number(formData.get('miles'));
            this.data.mpg = Number(formData.get('mpg'));
            this.data.mpg2 = Number(formData.get('mpg2'));
            this.data.vehicle = formData.get('vehicle');
            this.data.vehicle2 = formData.get('vehicle2');

            const result = this.calculate(this.data);
            
            this.modalShow(result);
        });

        return formEl;
    }// getForm

    getModal() {
        let modalWrapper = document.createElement('div');
        modalWrapper.id = 'fuel-cost-modal-wrapper';
        modalWrapper.className = 'hidden';
        modalWrapper.innerHTML = `
            <div id="fuel-cost-modal">
                <div id="fuel-cost-modal-header">
                    <span>Estimated Fuel Cost</span>
                    <span id="fuel-cost-modal-close">x</span>
                </div>
                <div id="fuel-cost-modal-body"></div>
            </div>
        `;

        return modalWrapper;
    }

    modalHide() {
        let modal = document.getElementById('fuel-cost-modal-wrapper');
        
        if (!modal) {
            alert('no modal found');
        } else {
            modal.classList.add('hidden');
        }
    }// modalHide

    modalShow(data) {
        let modalEl = document.getElementById('fuel-cost-modal-wrapper');

        let modalBodyHtml = `<p>${data.vehicle}: $${data.fuelCost}</p>`;
        
        if (data.fuelCost2 > 0) {
            modalBodyHtml += `<p>${data.vehicle2}: $${data.fuelCost2}</p>`;
            let lessExpensiveVehicle = data.fuelCost <= data.fuelCost2 ? data.vehicle : data.vehicle2;
            let savings = Math.abs(data.fuelCost2 - data.fuelCost);
            modalBodyHtml += `<p>The ${lessExpensiveVehicle} will save you $${savings}`;
        }
 
        let modalBody = document.getElementById('fuel-cost-modal-body');
        modalBody.innerHTML = modalBodyHtml;

        modalEl.classList.remove('hidden');
    }// modalShow

    initialize(containerEl) {
        containerEl.appendChild(this.getForm());
        containerEl.appendChild(this.getModal());

        document.getElementById('fuel-cost-modal-close').addEventListener('click', () => {
            this.modalHide();
        })
    }
}// GasCostCalculator

const contentContainer = document.getElementById('fuel-cost-container');

const calculator = new GasCostCalculator();

calculator.initialize(contentContainer);